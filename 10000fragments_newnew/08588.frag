uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.50 + t * 3.24 + ph) + sin(p.y * 3.69 - t * 3.24 + ph)
        + sin((p.x + p.y) * 5.37 + t * 3.24 + ph) + sin(length(p) * 12.47 - t * 3.24 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.80;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.89;
	p = rot2(time * 1.17) * p;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.92 + time * 0.06);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.87 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
