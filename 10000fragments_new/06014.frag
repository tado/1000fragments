uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 11.99);
    float gsh = hash21(vec2(grow, floor(t * 8.20))) - 0.5;
    float gx = p.x + gsh * 0.81;
    v = sin(gx * 16.94 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.59));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.56;
	p = rot2(time * 0.37) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.21; p = rot2(0.81) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.70 + time * 0.03);
	col = clamp((col - 0.5) * 1.95 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
