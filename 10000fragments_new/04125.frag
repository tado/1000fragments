uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.81 + sin(p.y * 2.83 + t * 4.10) * 2.84 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.27;
	{ p = vec2(atan(p.y, p.x) * 1.54, length(p) * 4.08 - time * 0.96); }
	p = rot2(2.60) * p;
	p = (floor(p * 15.5) + 0.5) / 15.5;
	p = rot2(p.y * -2.20 + time * 0.38) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.05), field(p, time, 2.11));
	col = 0.5 + 0.5 * col;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
