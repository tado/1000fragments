uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.80 + sin(p.y * 5.30 + t * 2.02) * 3.48 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.15;
	p = rot2(1.91) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.95 + time * 0.17);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
