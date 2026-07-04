uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.91 + 0.36 * sin(t * 0.86)) + vec2(-0.72, 0.16) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 25; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 25.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.60 + t * 0.65) - 0.5) * 2.0;
    v = sin((p.y * 4.65 + zx * 1.58 + t * 1.82) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.17);
	float d = d1 + d2;
	vec3 col = palette(d * 0.70 + time * 0.03, vec3(0.49, 0.40, 0.44), vec3(0.39, 0.34, 0.35), vec3(1.26, 1.09, 1.37), vec3(0.90, 0.80, 0.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
