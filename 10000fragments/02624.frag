uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 3.03 + vec2(t * 1.14, -t * 0.60);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.0 + 0.11 * sin(time * 2.57);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.75 + time * 0.22, vec3(0.44, 0.51, 0.40), vec3(0.36, 0.41, 0.36), vec3(1.26, 1.25, 1.33), vec3(0.70, 0.78, 0.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
