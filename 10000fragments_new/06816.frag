uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 18.28);
    float gsh = hash21(vec2(grow, floor(t * 3.96))) - 0.5;
    float gx = p.x + gsh * 0.84;
    v = sin(gx * 14.89 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.66));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.29; p = rot2(0.44) * p; }
	p *= 1.87;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.52), field(p, time, 1.05));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
