uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 13.05 - t * 1.91 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -1.02) * p;
	p.x += sin(p.y * 5.51 + time * 2.77) * 0.23;
	p = rot2(p.y * 3.74 + time * 1.17) * p;
	p = fract(p * 1.18) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.74 + time * 0.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
