uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.97 + sin(p.y * 4.63 + t * 5.69) * 4.67 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.27;
	p = rot2(length(p) * 3.53 + time * 0.21) * p;
	{ float fr = length(p); p *= 1.0 + 0.33 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.27), field(p, time, 2.53));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
