uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.59, 0.0)) * 13.68 - t * 2.02 + ph);
    float mb = sin(length(p + vec2(0.59, 0.0)) * 38.50 - t * 1.79 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.46;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.12) * p * 9.20;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.62;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = mix(vec3(0.88, 0.93, 0.70), vec3(0.02, 0.09, 0.08), v);
	col = fract(col * 1.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
