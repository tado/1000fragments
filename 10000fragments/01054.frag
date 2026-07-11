uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.52 + t * 3.49 + ph) + sin(p.y * 13.03 - t * 3.49 + ph)
        + sin((p.x + p.y) * 4.56 + t * 3.49 + ph) + sin(length(p) * 9.19 - t * 3.49 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.82;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.49; p = rot2(0.54) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.33), field(p, time, 2.66));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
