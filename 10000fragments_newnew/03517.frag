uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.40 + t * 2.00 + ph) + sin(p.y * 5.78 - t * 3.37 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.91;
	p = (floor(p * 7.0) + 0.5) / 7.0;
	p = rot2(p.y * 3.99 + time * 0.73) * p;
	p = sin(p * 1.97 + time * 1.89) * 1.46;
	p = rot2(length(p) * 3.78 + time * 0.81) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.29, 0.71, 0.16) * (0.07 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
