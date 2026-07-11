uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.75 + t * 2.15 + ph) + sin(p.y * 4.96 - t * 2.15 + ph)
        + sin((p.x + p.y) * 4.32 + t * 2.15 + ph) + sin(length(p) * 14.33 - t * 2.15 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.40;
	p = rot2(p.y * -1.95 + time * 0.27) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.72, 0.41, 0.73) * (0.05 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
