uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.33 + t * 1.94 + ph) + sin(p.y * 2.52 - t * 3.22 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.60;
	p = rot2(time * 0.21) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.16), field(p, time, 2.32));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.51 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
