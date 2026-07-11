uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.37 + sin(p.y * 1.32 + t * 1.63) * 2.08 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.63;
	p = rot2(length(p) * 3.65 + time * 0.34) * p;
	p = rot2(time * -0.52) * p;
	p *= 1.39;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.64 + time * 0.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
