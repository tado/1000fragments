uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.54 + t * 4.88 + ph) + sin(p.y * 8.39 - t * 4.88 + ph)
        + sin((p.x + p.y) * 9.32 + t * 4.88 + ph) + sin(length(p) * 3.60 - t * 4.88 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.11;
	{ p = vec2(atan(p.y, p.x) * 1.50, length(p) * 2.47 - time * 0.24); }
	p = rot2(length(p) * -3.19 + time * 0.39) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.22), field(p, time, 2.45));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.42));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
