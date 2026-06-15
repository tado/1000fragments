uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.55 + t * 1.60 + ph) + sin(p.y * 7.48 - t * 1.60 + ph)
        + sin((p.x + p.y) * 7.06 + t * 1.60 + ph) + sin(length(p) * 12.57 - t * 1.60 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.07, 0.59, 1.49) + vec3(0.18, 0.25, 0.09);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
