uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.70 + sin(p.y * 2.92 + t * 1.22) * 3.25 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.61;
	p = rot2(length(p) * -1.25 + time * 1.24) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.14 + time * 0.11);
	col *= 0.81 + 0.14 * sin(gl_FragCoord.y * 2.27 + time * 5.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
