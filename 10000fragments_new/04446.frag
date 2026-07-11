uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 5.22 + t * 3.30 + ph) * 0.7;
    float wb = sin(p.y * 5.02 - t * 1.50 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.21;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.90;
	p = rot2(p.y * 3.26 + time * 0.89) * p;
	p = (floor(p * 19.5) + 0.5) / 19.5;
	p = fract(p * 1.13) - 0.5;
	p = rot2(time * -1.24) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.78), field(p, time, 1.55));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
