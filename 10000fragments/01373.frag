uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 18.87 - t * 8.23 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(1.91) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.25; p = rot2(0.45) * p; }
	p *= 2.59;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.05 + time * 0.02, vec3(0.48, 0.40, 0.59), vec3(0.31, 0.40, 0.42), vec3(1.14, 1.05, 1.03), vec3(0.50, 0.49, 0.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
