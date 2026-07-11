uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 35.09 - t * 8.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.20;
	p = rot2(1.75) * p;
	p = abs(p) - 0.54;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.34, 0.79, 0.64) * (0.11 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= 0.88 + 0.19 * sin(gl_FragCoord.y * 1.38 + time * 8.50);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
