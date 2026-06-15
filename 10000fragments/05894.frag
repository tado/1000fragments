uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.08 + t * 3.97 + ph) + sin(p.y * 4.95 - t * 3.97 + ph)
        + sin((p.x + p.y) * 5.58 + t * 3.97 + ph) + sin(length(p) * 8.40 - t * 3.97 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.04;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.36; p = rot2(1.57) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.65, 0.85, 0.76) + vec3(0.28, 0.03, 0.20);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
