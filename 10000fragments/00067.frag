uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.09 + t * 4.94 + ph) + sin(p.y * 5.32 - t * 5.72 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.49;
	p = rot2(length(p) * 1.58 + time * 0.62) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.42; p = rot2(1.61) * p; }
	p = abs(p);
	p = rot2(p.y * -3.53 + time * 0.46) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.25, 0.90, 0.79) + vec3(0.11, 0.16, 0.04);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
