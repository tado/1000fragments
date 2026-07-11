uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 20.97);
    float gsh = hash21(vec2(grow, floor(t * 2.26))) - 0.5;
    float gx = p.x + gsh * 0.46;
    v = sin(gx * 13.91 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.28));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.57;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.59; p = rot2(0.71) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.78), field(p, time, 1.56));
	col = 0.5 + 0.5 * col;
	col *= 0.88 + 0.18 * sin(gl_FragCoord.y * 2.81 + time * 13.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
