uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 22.46 - t * 3.87 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * -3.35 + time * 0.36) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.16; p = rot2(1.09) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.88 + time * 0.21, vec3(0.56, 0.53, 0.41), vec3(0.33, 0.30, 0.49), vec3(1.29, 0.99, 0.93), vec3(0.84, 0.93, 0.09));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
