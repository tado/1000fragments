uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.36, 0.0)) * 16.85 - t * 5.54 + ph);
    float mb = sin(length(p + vec2(0.36, 0.0)) * 12.56 - t * 5.54 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.72) - 0.5;
    float rad = 0.36 + 0.12 * sin(t * 2.68 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.56;
	p = rot2(2.77) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.44; p = rot2(1.63) * p; }
	p = rot2(p.y * -2.41 + time * 0.14) * p;
	p *= 2.08;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.79);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.40 + time * 0.02, vec3(0.47, 0.54, 0.51), vec3(0.33, 0.32, 0.45), vec3(0.76, 1.30, 0.93), vec3(0.30, 0.28, 0.35));
	col = fract(col * 1.78);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
