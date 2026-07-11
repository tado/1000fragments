uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.57;
    v = 0.5 * (sin(2.0 * cp.x + t * 2.44) * sin(6.0 * cp.y + ph)
             + sin(6.0 * cp.x - t * 1.60) * sin(2.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.47 / 3.1415927, 0.61 / r - time * 1.48);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.87, 0.76, 0.34) * (0.24 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col *= clamp(r * 2.74, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
