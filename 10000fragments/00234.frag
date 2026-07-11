uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.62 + t * 2.56 + ph) + sin(p.y * 12.92 - t * 3.22 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.65;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.32; p = rot2(0.94) * p; }
	p = rot2(2.03) * p;
	p = abs(p) - 0.48;
	p = rot2(time * -1.07) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.04 + time * 0.15, vec3(0.50, 0.58, 0.47), vec3(0.47, 0.37, 0.38), vec3(0.83, 1.31, 0.89), vec3(0.45, 0.43, 0.96));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.90));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
