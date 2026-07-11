uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 19.01);
    float gsh = hash21(vec2(grow, floor(t * 9.99))) - 0.5;
    float gx = p.x + gsh * 0.42;
    v = sin(gx * 13.13 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.22));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.31; p = rot2(1.94) * p; }
	p += vec2(-0.74, 0.86) * sin(length(p) * 3.49 - time * 2.25) * 0.15;
	p *= 1.85;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.81, 0.72, 0.23) * (0.10 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = fract(col * 2.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
