uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.77 + t * 0.81 + ph) + sin(p.y * 5.20 - t * 0.81 + ph)
        + sin((p.x + p.y) * 2.20 + t * 0.81 + ph) + sin(length(p) * 6.52 - t * 0.81 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.39;
	p = abs(p);
	p *= 1.37;
	p = rot2(time * -1.21) * p;
	p = rot2(2.06) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.81 + time * 0.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
