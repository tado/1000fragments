uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.17 + t * 2.84 + ph) + sin(p.y * 4.01 - t * 2.84 + ph)
        + sin((p.x + p.y) * 7.73 + t * 2.84 + ph) + sin(length(p) * 14.10 - t * 2.84 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.47;
	p *= 1.41;
	p += vec2(0.77, -0.97) * sin(length(p) * 3.46 - time * 1.74) * 0.17;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.52; p = rot2(2.05) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.43 + time * 0.03, vec3(0.57, 0.59, 0.41), vec3(0.31, 0.31, 0.43), vec3(0.76, 1.06, 1.21), vec3(0.80, 0.37, 0.46));
	col = mod(col * 1.50, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
