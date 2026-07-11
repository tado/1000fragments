uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 33.03 - t * 1.92 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.40;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.13; p = rot2(1.94) * p; }
	p = rot2(2.90) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.48 + time * 0.22, vec3(0.50, 0.56, 0.50), vec3(0.47, 0.49, 0.50), vec3(1.14, 1.11, 1.32), vec3(0.58, 0.71, 0.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
