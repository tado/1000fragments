uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.44 + t * 4.85 + ph) + sin(p.y * 13.63 - t * 4.85 + ph)
        + sin((p.x + p.y) * 7.32 + t * 4.85 + ph) + sin(length(p) * 16.85 - t * 4.85 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.48;
	p = rot2(p.y * 1.26 + time * 0.52) * p;
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + 0.68 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.29), field(p, time, 2.59));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
