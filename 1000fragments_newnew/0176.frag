uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.34;
    v = 0.5 * (sin(5.0 * cp.x + t * 0.56) * sin(4.0 * cp.y + ph)
             + sin(4.0 * cp.x - t * 2.08) * sin(5.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.82) * 0.69;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.45 / 3.1415927, 0.70 / r - (time * 0.82) * 2.50);
	tv.x += tv.y * 0.40;
	float d = field(tv, (time * 0.82), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.52, 0.51, 0.51) + vec3(0.03, 0.09, 0.05);
	col *= clamp(r * 2.61, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(0.947, 0.975, 1.055) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
