uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.55, 0.0)) * 36.59 - t * 3.12 + ph);
    float mb = sin(length(p + vec2(0.55, 0.0)) * 26.13 - t * 7.54 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.67) * p * 10.69;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.67;
	float v = smoothstep(rad, rad - 0.15, length(hf));
	vec3 col = mix(vec3(0.73, 1.00, 0.91), vec3(0.01, 0.09, 0.02), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
