uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.60 + t * 1.11 + ph) + sin(p.y * 7.63 - t * 1.11 + ph)
        + sin((p.x + p.y) * 6.13 + t * 1.11 + ph) + sin(length(p) * 6.95 - t * 1.11 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.60;
	p = abs(p) - 0.32;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.23; p = rot2(0.49) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.94), field(p, time, 1.88));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.74 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
