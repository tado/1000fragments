uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.13 + jf * 4.0), cos(t * 0.59 * jf)) * 0.44;
        xs += sin(length(p - im) * 146.84 - t * 4.61 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.70 + time * 0.14, vec3(0.53, 0.41, 0.47), vec3(0.49, 0.37, 0.44), vec3(1.11, 0.88, 1.14), vec3(0.56, 0.84, 0.37));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
