uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.41 + jf * 4.0), cos(t * 0.22 * jf)) * 0.63;
        xs += sin(length(p - im) * 111.72 - t * 9.65 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.60 + t * 3.63 + ph) + sin(p.y * 11.74 - t * 5.76 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.57;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.81);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.46 + time * 0.14, vec3(0.51, 0.47, 0.50), vec3(0.50, 0.48, 0.49), vec3(1.20, 0.96, 0.92), vec3(0.07, 0.73, 0.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
