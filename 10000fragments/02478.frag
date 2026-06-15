uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.37 + t * 3.58 + ph) + sin(p.y * 2.11 - t * 3.58 + ph)
        + sin((p.x + p.y) * 9.83 + t * 3.58 + ph) + sin(length(p) * 7.73 - t * 3.58 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.25; p = rot2(2.21) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.50 + time * 0.02);
	col = mod(col * 1.21, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
