uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.75 + t * 1.92 + ph) + sin(p.y * 3.23 - t * 2.27 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.73;
	p = rot2(2.51) * p;
	p += vec2(-0.63, -0.32) * sin(length(p) * 3.53 - time * 1.21) * 0.22;
	p = rot2(length(p) * -1.74 + time * 0.41) * p;
	p = rot2(time * -0.90) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.91 + time * 0.07);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
