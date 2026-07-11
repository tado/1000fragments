uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.53 + t * 1.25 + ph) + sin(p.y * 13.80 - t * 1.25 + ph)
        + sin((p.x + p.y) * 11.32 + t * 1.25 + ph) + sin(length(p) * 8.67 - t * 1.25 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.23 + time * 0.25, vec3(0.48, 0.44, 0.42), vec3(0.33, 0.31, 0.38), vec3(1.14, 0.96, 1.02), vec3(0.78, 0.42, 0.54));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
