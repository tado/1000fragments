uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 15.56);
    float gsh = hash21(vec2(grow, floor(t * 7.87))) - 0.5;
    float gx = p.x + gsh * 0.98;
    v = sin(gx * 6.21 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.10));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.56;
	p.x += sin(p.y * 5.32 + time * 2.56) * 0.38;
	p = rot2(2.68) * p;
	p = fract(p * 1.23) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.43), field(p, time, 0.86));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.06));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
