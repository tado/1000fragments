uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.41 + jf * 4.0), cos(t * 0.15 * jf)) * 0.68;
        xs += sin(length(p - im) * 187.07 - t * 8.88 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.22;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.85 + time * 0.22, vec3(0.58, 0.46, 0.53), vec3(0.48, 0.34, 0.39), vec3(0.70, 0.93, 1.04), vec3(0.26, 0.35, 0.48));
	col = fract(col * 2.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
