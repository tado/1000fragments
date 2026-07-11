uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 3.49 + vec2(t * 0.39, -t * 1.28);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.76;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.72 + time * 0.26, vec3(0.44, 0.52, 0.57), vec3(0.39, 0.41, 0.41), vec3(1.18, 0.94, 0.82), vec3(0.43, 0.49, 0.23));
	col = mod(col * 2.71, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
