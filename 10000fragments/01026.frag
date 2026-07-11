uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.95 + t * 3.46 + ph) + sin(p.y * 2.10 - t * 3.46 + ph)
        + sin((p.x + p.y) * 5.48 + t * 3.46 + ph) + sin(length(p) * 4.88 - t * 3.46 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.37;
	p = rot2(time * 0.58) * p;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.75 + time * 0.17);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
