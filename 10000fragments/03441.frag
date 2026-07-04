uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.31, 0.0)) * 19.06 - t * 4.89 + ph);
    float mb = sin(length(p + vec2(0.31, 0.0)) * 18.42 - t * 1.76 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.40;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.40) * p * 9.82;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.61;
	float v = smoothstep(rad, rad - 0.14, length(hf));
	vec3 col = mix(vec3(0.71, 0.92, 0.82), vec3(0.09, 0.07, 0.15), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
