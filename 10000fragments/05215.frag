uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.16 + t * 2.75 + ph) + sin(p.y * 2.83 - t * 2.75 + ph)
        + sin((p.x + p.y) * 7.51 + t * 2.75 + ph) + sin(length(p) * 8.84 - t * 2.75 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.48; p = rot2(2.19) * p; }
	p += vec2(-0.98, 0.36) * sin(length(p) * 4.22 - time * 1.99) * 0.13;
	p = rot2(length(p) * 2.52 + time * 0.62) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.67 + time * 0.20, vec3(0.57, 0.41, 0.53), vec3(0.39, 0.44, 0.40), vec3(1.20, 1.28, 1.30), vec3(0.63, 0.68, 0.19));
	col = fract(col * 2.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
