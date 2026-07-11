uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.00 + t * 2.90 + ph) + sin(p.y * 6.79 - t * 2.90 + ph)
        + sin((p.x + p.y) * 3.00 + t * 2.90 + ph) + sin(length(p) * 5.25 - t * 2.90 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.19;
	p = rot2(length(p) * -3.85 + time * 0.66) * p;
	p *= 2.58;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.19; p = rot2(1.35) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.24 + time * 0.10, vec3(0.47, 0.51, 0.52), vec3(0.37, 0.50, 0.47), vec3(1.29, 0.87, 1.39), vec3(0.37, 0.81, 0.06));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
