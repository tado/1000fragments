uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 21.00);
    float gsh = hash21(vec2(grow, floor(t * 6.85))) - 0.5;
    float gx = p.x + gsh * 0.65;
    v = sin(gx * 11.68 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.12));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * -3.68 + time * 0.61) * p;
	p = (floor(p * 12.7) + 0.5) / 12.7;
	p += vec2(0.92, -0.48) * sin(length(p) * 4.27 - time * 2.16) * 0.22;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.48, 0.25, 1.00) * (0.11 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.12;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
