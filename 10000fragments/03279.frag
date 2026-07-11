uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.16) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 2.48 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * 3.26 + time * 0.95) * p;
	{ float fr = length(p); p *= 1.0 + 0.38 * fr * fr; }
	p = fract(p * 2.82) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.00, 1.55, 0.54) + vec3(0.03, 0.22, 0.12);
	col = fract(col * 1.65);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
