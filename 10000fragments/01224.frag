uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.46 + t * 4.41 + ph) + sin(p.y * 7.08 - t * 4.41 + ph)
        + sin((p.x + p.y) * 5.92 + t * 4.41 + ph) + sin(length(p) * 11.79 - t * 4.41 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 2.83, length(p) * 4.24 - time * 0.31); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.66 + time * 0.06);
	col = mod(col * 1.61, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
