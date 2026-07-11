uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 6.34 - t * 6.25 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.05;
	p.y += sin(p.x * 7.44 + time * 3.20) * 0.20;
	p = rot2(time * 0.77) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.68 + time * 0.12);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.28));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
