uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.46 + t * 2.44 + ph) + sin(p.y * 7.37 - t * 2.44 + ph)
        + sin((p.x + p.y) * 4.45 + t * 2.44 + ph) + sin(length(p) * 17.68 - t * 2.44 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.54;
	{ p = vec2(atan(p.y, p.x) * 2.19, length(p) * 2.75 - time * 0.62); }
	p = rot2(time * 0.32) * p;
	p = abs(p) - 0.29;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.34 + time * 0.18);
	col = clamp((col - 0.5) * 1.48 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
