uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.87) - 0.5;
    float rad = 0.41 + 0.12 * sin(t * 2.63 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.11;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.69) * p * 15.24;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.74;
	float v = smoothstep(rad, rad - 0.11, length(hf));
	vec3 col = mix(vec3(0.83, 0.97, 0.76), vec3(0.02, 0.09, 0.08), v);
	col *= 0.90 + 0.15 * sin(gl_FragCoord.y * 1.41 + time * 11.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
