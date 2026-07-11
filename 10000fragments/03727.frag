uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.86) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 2.43 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.51; p = rot2(1.74) * p; }
	{ p = vec2(atan(p.y, p.x) * 1.34, length(p) * 2.86 - time * 0.48); }
	p = rot2(length(p) * -3.24 + time * 0.75) * p;
	p = rot2(2.25) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.57 + time * 0.09, vec3(0.52, 0.53, 0.41), vec3(0.37, 0.48, 0.48), vec3(0.88, 1.10, 1.09), vec3(0.36, 0.09, 0.06));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
